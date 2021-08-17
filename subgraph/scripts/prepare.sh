#!/bin/bash
NETWORK=$1
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
HOME_DIR=$DIR/../

cp $HOME_DIR/configs/subgraph.$NETWORK.yaml $HOME_DIR/subgraph.yaml
yarn codegen
yarn build
