# =============================================================================
# EKS ADD-ONS AND EXTENSIONS
# =============================================================================

module "eks_addons" {
  source  = "aws-ia/eks-blueprints-addons/aws"
  version = "~> 1.0"

  # Cluster information
  cluster_name      = module.retail_app_eks.cluster_name
  cluster_endpoint  = module.retail_app_eks.cluster_endpoint
  cluster_version   = module.retail_app_eks.cluster_version
  oidc_provider_arn = module.retail_app_eks.oidc_provider_arn

  # =============================================================================
  # CERT-MANAGER - SSL Certificate Management
  # =============================================================================
  enable_cert_manager = true
  cert_manager = {
    most_recent = true
    namespace   = "cert-manager"
  }

  # =============================================================================
  # NGINX INGRESS CONTROLLER - Load Balancing and Routing
  # =============================================================================
  enable_ingress_nginx = false

  # =============================================================================
  # OPTIONAL: MONITORING STACK
  # =============================================================================
  # Uncomment below to enable monitoring (increases costs)

  # enable_kube_prometheus_stack = var.enable_monitoring
  # kube_prometheus_stack = {
  #   most_recent = true
  #   namespace   = "monitoring"
  # }

  # =============================================================================
  # AWS LOAD BALANCER CONTROLLER (for ALB Ingress on EKS)
  # =============================================================================
  enable_aws_load_balancer_controller = true
  aws_load_balancer_controller = {
    most_recent = true
    namespace   = "kube-system"
  }

  depends_on = [module.retail_app_eks]
}