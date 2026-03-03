@echo off
REM Quick-start batch to run tracker-app server from this folder
pushd %~dp0
python start_server.py %*
popd
