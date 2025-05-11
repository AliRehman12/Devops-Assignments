
# E-Commerce Application with Blue-Green Deployment

This project demonstrates an e-commerce application with blue-green deployment capabilities using Terraform, AWS EKS, and Kubernetes.

## Application Features

- Product catalog and detail pages
- Shopping cart functionality
- Checkout process
- Order confirmation
- Responsive design for mobile and desktop

## Architecture

The application is built with:
- React for frontend
- Express.js for backend
- Tailwind CSS for styling
- OpenTelemetry for observability
- Docker for containerization
- Kubernetes for orchestration
- Terraform for infrastructure provisioning

## Deployment Strategy

The application uses a blue-green deployment strategy which allows for zero-downtime deployments:

1. Two identical environments (blue and green) are maintained
2. Only one environment serves production traffic at a time
3. New versions are deployed to the inactive environment
4. Traffic is switched to the new environment after testing
5. The old environment remains available for quick rollback if needed

## Prerequisites

- AWS CLI configured with appropriate permissions
- kubectl installed
- Terraform installed (v1.0+)
- Docker installed

## Setup Instructions

### 1. Provision Infrastructure with Terraform

```bash
cd terraform
terraform init
terraform apply -auto-approve
```

Save the outputs for use in later steps.

### 2. Configure kubectl for the EKS Cluster

```bash
aws eks update-kubeconfig --name ecommerce-cluster --region us-west-2
```

### 3. Create Kubernetes Namespaces

```bash
kubectl apply -f k8s/namespaces.yaml
```

### 4. Build and Push the Docker Images

```bash
# Login to ECR
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin $(terraform output -raw ecr_repository_url)

# Build and push blue version
docker build -t ecommerce:blue --build-arg VERSION=blue .
docker tag ecommerce:blue $(terraform output -raw ecr_repository_url):blue
docker push $(terraform output -raw ecr_repository_url):blue

# Build and push green version (when you have a new version)
docker build -t ecommerce:green --build-arg VERSION=green .
docker tag ecommerce:green $(terraform output -raw ecr_repository_url):green
docker push $(terraform output -raw ecr_repository_url):green
```

### 5. Deploy Blue Version First

```bash
kubectl apply -f k8s/blue-deployment.yaml
kubectl apply -f k8s/service.yaml
```

### 6. Test the Blue Deployment

Get the load balancer URL:
```bash
kubectl get service ecommerce -n ecommerce
```

Visit the URL to verify the blue deployment is working.

### 7. Deploy Green Version (for new releases)

```bash
kubectl apply -f k8s/green-deployment.yaml
```

### 8. Switch Traffic to Green Version

```bash
chmod +x k8s/switch-deployment.sh
./k8s/switch-deployment.sh green
```

### 9. Verify the Green Deployment

Visit the load balancer URL again and verify the green version is now serving traffic.

### 10. Rollback to Blue (if needed)

```bash
./k8s/switch-deployment.sh blue
```

## Monitoring and Observability

The application is instrumented with OpenTelemetry, which sends metrics to Prometheus and traces to Jaeger. Check the `/observability.md` file for details on accessing these tools.

## Cleaning Up

To destroy all resources and avoid unnecessary AWS charges:

```bash
terraform destroy -auto-approve
```

## CI/CD Pipeline Integration

This repository can be integrated with CI/CD tools like GitHub Actions, Jenkins, or AWS CodePipeline. Sample workflow files are provided in the `.github/workflows` directory.

## License

MIT
