# monolito-k8s
Kubernetes microservices example.<br/>
https://dev.to/nathanbland/setting-up-a-kubernetes-cluster-live-stream-replay-with-notes-i10

# K8s cluster
K8sSrv: master kubernetes.<br/>
K8sA: "A" node.<br/>
K8sB: "B" node.<br/>

# Requisites
3 Pcs / VMs "K8sSrv", "K8sA" and "K8sB".<br/>
Ubuntu 18.04.3 LTS.<br/>
ssh connection enabled.

# Common master and nodes setup
sudo apt-get update && sudo apt-get install -y apt-transport-https<br/>
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add<br/>
sudo apt-add-repository "deb http://apt.kubernetes.io/ kubernetes-xenial main"<br/>
sudo apt-get update<br/>
sudo apt install kubectl kubeadm docker.io<br/>
sudo swapoff -a<br/>
vi /etc/fstab<br/>
Remove the entire line with swap<br/>
sudo systemctl enable docker.service<br/>
sudo nano /etc/docker/daemon.json<br/>
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}<br/>
sudo mkdir -p /etc/systemd/system/docker.service.d <br/>
sudo systemctl daemon-reload && sudo systemctl restart docker<br/>
sudo kubeadm config images pull

# Master init
sudo kubeadm init<br/>
mkdir -p $HOME/.kube<br/>
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config<br/>
sudo chown $(id -u):$(id -g) $HOME/.kube/config<br/>
kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"<br/>
kubectl get pods --all-namespaces

# Adding nodes
kubeadm join <<master IP>>:6443 --token 83grri.na11jdbbmyplsyy1 --discovery-token-ca-cert-hash sha256:<<master token>> 

