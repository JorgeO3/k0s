#!/bin/bash

sleep 5

touch /opt

echo "ESTA FUNCIONANDO"

for i in {1..4} ; do
  k0s token create --role=worker --expiry=100h > "token-file-$i"
  mv "token-file-$i" /opt/
done