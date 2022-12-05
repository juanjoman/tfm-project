#!/usr/bin/env zsh
# Script to be used when resources have been soft-deleted from azure
REGION="eastus"
TOKEN=$(az account get-access-token --query accessToken --output tsv)
AZURE_SUBSCRIPTION_ID=$(az account show --query id --output tsv)


GET_URL="https://management.azure.com/subscriptions/${AZURE_SUBSCRIPTION_ID}/providers/Microsoft.ApiManagement/deletedservices?api-version=2020-12-01"
BEARER="Authorization: Bearer ${TOKEN}"
SERVICES_NAME=$(curl --request GET "${GET_URL}" --header "${BEARER}" | jq -r '.value[].name')


echo $SERVICES_NAME | while read line ; do
	printf "\nRemoving $line\n\n"
	DELETE_URL="https://management.azure.com/subscriptions/${AZURE_SUBSCRIPTION_ID}/providers/Microsoft.ApiManagement/locations/${REGION}/deletedservices/${line}?api-version=2020-12-01"
	curl --request DELETE "${DELETE_URL}" --header "${BEARER}"
done


printf "\n\n>>> Pending services\n\n"

curl --request GET "${GET_URL}" --header "${BEARER}" | jq '.value[].name'