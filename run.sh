#!/bin/bash
echo "... running verba"
uvicorn goldenverba.server.api:app --host 0.0.0.0 --port 5154
