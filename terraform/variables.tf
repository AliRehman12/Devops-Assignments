
variable "region" {
  description = "AWS Region"
  type        = string
  default     = "us-west-2"
}

variable "prefix" {
  description = "Prefix for resources"
  type        = string
  default     = "ecommerce"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "Availability zones"
  type        = list(string)
  default     = ["us-west-2a", "us-west-2b", "us-west-2c"]
}

variable "private_subnets" {
  description = "Private subnet CIDR blocks"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}

variable "public_subnets" {
  description = "Public subnet CIDR blocks"
  type        = list(string)
  default     = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
}

variable "kubernetes_version" {
  description = "Kubernetes version"
  type        = string
  default     = "1.27"
}

variable "node_group_min_size" {
  description = "Node group minimum size"
  type        = number
  default     = 2
}

variable "node_group_max_size" {
  description = "Node group maximum size"
  type        = number
  default     = 5
}

variable "node_group_desired_size" {
  description = "Node group desired size"
  type        = number
  default     = 3
}

variable "node_instance_types" {
  description = "EC2 instance types to use for EKS nodes"
  type        = list(string)
  default     = ["t3.medium"]
}

variable "tags" {
  description = "Tags for resources"
  type        = map(string)
  default     = {
    Project     = "ecommerce"
    Environment = "production"
    ManagedBy   = "terraform"
  }
}
