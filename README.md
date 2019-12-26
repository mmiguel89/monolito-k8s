# monolito-k8s
Kubernetes microservices example.
https://dev.to/nathanbland/setting-up-a-kubernetes-cluster-live-stream-replay-with-notes-i10

# K8s cluster
K8sSrv: master kubernetes.
K8sA: "A" node.
K8sB: "B" node.

# Requisites
3 Pcs / VMs "K8sSrv", "K8sA" and "K8sB".
Ubuntu 18.04.3 LTS.
ssh connection enabled.

# Common master and nodes setup
sudo apt-get update && sudo apt-get install -y apt-transport-https
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add
sudo apt-add-repository "deb http://apt.kubernetes.io/ kubernetes-xenial main"
sudo apt-get update
sudo apt install kubectl kubeadm docker.io

sudo swapoff -a
vi /etc/fstab
Remove the entire line with swap

sudo systemctl enable docker.service

sudo nano /etc/docker/daemon.json
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}

sudo mkdir -p /etc/systemd/system/docker.service.d
sudo systemctl daemon-reload && sudo systemctl restart docker

# Master init
sudo kubeadm config images pull

sudo kubeadm init
Results like
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
Copy result token 

kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"

kubectl get pods --all-namespaces

# Adding nodes
kubeadm join <<master IP>>:6443 --token 83grri.na11jdbbmyplsyy1 --discovery-token-ca-cert-hash sha256:<<master token>> 

