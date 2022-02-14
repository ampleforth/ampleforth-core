#!/bin/bash
set -e

mustache ./configs/$1.json subgraph.template.yaml > ./subgraph.yaml

yarn codegen

yarn build

yarn create-local

yarn deploy-local
