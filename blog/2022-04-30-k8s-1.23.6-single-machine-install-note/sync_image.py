import subprocess
import sys
from typing import List

images_k8s = [
    "k8s.gcr.io/kube-apiserver:v1.23.6",
    "k8s.gcr.io/kube-controller-manager:v1.23.6",
    "k8s.gcr.io/kube-scheduler:v1.23.6",
    "k8s.gcr.io/kube-proxy:v1.23.6",
    "k8s.gcr.io/pause:3.6",
    "k8s.gcr.io/etcd:3.5.1-0",
    "k8s.gcr.io/coredns/coredns:v1.8.6",
]

images_calico = [
    "docker.io/calico/cni:v3.22.2",
    "docker.io/calico/pod2daemon-flexvol:v3.22.2",
    "docker.io/calico/node:v3.22.2",
    "docker.io/calico/kube-controllers:v3.22.2",
]

images_dashboard = [
    "kubernetesui/dashboard:v2.5.1",
    "kubernetesui/metrics-scraper:v1.0.7",
]

images_ingress = [
    "k8s.gcr.io/ingress-nginx/controller:v1.2.0@sha256:d8196e3bc1e72547c5dec66d6556c0ff92a23f6d0919b206be170bc90d5f9185",
    "k8s.gcr.io/ingress-nginx/kube-webhook-certgen:v1.1.1@sha256:64d8c73dca984af206adf9d6d7e46aa550362b1d7a01f3a0a91b20cc67868660",
]

image_ccr_dict = {}


def replace_image_names():
    for image in images_k8s:
        if "k8s.gcr.io/coredns" in image:
            image_new = image.replace("k8s.gcr.io/coredns", "ccr.ccs.tencentyun.com/aweffr-main")
        else:
            image_new = image.replace("k8s.gcr.io", "ccr.ccs.tencentyun.com/aweffr-main")
        print(f'{image} -> {image_new}')
        image_ccr_dict[image] = image_new

    for image in images_calico:
        image_new = image.replace("docker.io/calico", "ccr.ccs.tencentyun.com/aweffr-calico")
        print(f'{image} -> {image_new}')
        image_ccr_dict[image] = image_new

    for image in images_dashboard:
        image_new = image.replace("kubernetesui/", "ccr.ccs.tencentyun.com/aweffr-main/k8s-")
        print(f'{image} -> {image_new}')
        image_ccr_dict[image] = image_new

    for image in images_ingress:
        image_name = image.split('@')[0]
        image_new = image_name.replace("k8s.gcr.io/ingress-nginx/", "ccr.ccs.tencentyun.com/aweffr-main/ingress-nginx-")
        print(f'{image_name} -> {image_new}')
        image_ccr_dict[image] = image_new


def sync_images(origin_image_list: List[str]):
    for image in origin_image_list:
        cmd1 = f"docker pull {image}"
        subprocess.call(cmd1, shell=True)

        image_new = image_ccr_dict[image]
        origin_image_name = image.split("@")[0]
        cmd2 = f"docker tag {origin_image_name} {image_new}"
        subprocess.call(cmd2, shell=True)

        cmd3 = f"docker push {image_new}"
        subprocess.call(cmd3, shell=True)


replace_image_names()

if __name__ == "__main__":
    if "k8s" in sys.argv:
        sync_images(images_k8s)

    if "calico" in sys.argv:
        sync_images(images_calico)

    if "dashboard" in sys.argv:
        sync_images(images_dashboard)

    if "ingress" in sys.argv:
        sync_images(images_ingress)
