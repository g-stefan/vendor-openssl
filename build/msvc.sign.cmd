@echo off
rem Public domain
rem http://unlicense.org/
rem Created by Grigore Stefan <g_stefan@yahoo.com>

echo -^> sign vendor-openssl

pushd temp\openssl\bin
for /r %%i in (*.dll) do call grigore-stefan.sign "OpenSSL" "%%i"
for /r %%i in (*.exe) do call grigore-stefan.sign "OpenSSL" "%%i"
popd

pushd temp\openssl\lib\engines-1_1
for /r %%i in (*.dll) do call grigore-stefan.sign "OpenSSL" "%%i"
popd
