
#!/bin/bash

# Script to switch between blue and green deployments

# Check if an argument is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 [blue|green]"
    exit 1
fi

# Get the desired version
VERSION=$1

# Validate the version
if [ "$VERSION" != "blue" ] && [ "$VERSION" != "green" ]; then
    echo "Error: Version must be either 'blue' or 'green'"
    exit 1
fi

# Print the current version
echo "Switching to $VERSION deployment..."

# Update the service selector to point to the new version
kubectl patch service ecommerce -n ecommerce -p "{\"spec\":{\"selector\":{\"version\":\"$VERSION\"}}}"

# Verify the deployment switch
echo "Verifying the service points to $VERSION deployment..."
kubectl get service ecommerce -n ecommerce -o jsonpath='{.spec.selector.version}'
echo ""

echo "Deployment switched to $VERSION successfully!"

# Print the load balancer URL
echo "Access the application at:"
kubectl get service ecommerce -n ecommerce -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'
echo ""
