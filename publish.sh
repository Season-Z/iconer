#!/bin/bash

echo "start build package"
pnpm build

echo "start write log"
pnpm changeset
pnpm changeset version

echo "start publish package"

npm publish

echo "publish succeed"