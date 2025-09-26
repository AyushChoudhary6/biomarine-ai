Kubernetes manifests for deploying Biomarine AI to AWS EKS. Apply in this order (or use kustomize):

1. namespace.yaml
2. configmap.yaml
3. secrets.example.yaml (copy to secrets.yaml with real values)
4. backend-deployment.yaml
5. frontend-deployment.yaml
6. ingress.yaml

Optional:
- dynamodb-setup-job.yaml (one-off)


