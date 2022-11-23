#!/usr/bin/env bash
# Use this file as "source <path-to-this-bash-file> && boost deploy -e production"
SP_DISPLAY_NAME="my-store-774600-sp" #replace <service-principal-name> with the name of your own SP
REGION="East US" #replace with a region of your choice, see full list here: https://azure.microsoft.com/en-us/global-infrastructure/locations/

export AZURE_APP_ID=$(az ad sp list --display-name ${SP_DISPLAY_NAME} | jq -r '.[].appId')
#export AZURE_TENANT_ID=$(az account show | jq -r '.tenantId')
export AZURE_TENANT_ID=$(az ad sp list --display-name ${SP_DISPLAY_NAME} | jq -r '.[].appOwnerOrganizationId')
export AZURE_SECRET=$(az ad sp credential reset --id ${AZURE_APP_ID} | jq -r '.password')
export AZURE_SUBSCRIPTION_ID=$(az account show | jq -r '.id')
export REGION
