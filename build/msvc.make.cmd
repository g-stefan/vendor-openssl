@echo off
rem Public domain
rem http://unlicense.org/
rem Created by Grigore Stefan <g_stefan@yahoo.com>

set ACTION=%1
if "%1" == "" set ACTION=make

echo -^> %ACTION% vendor-openssl

goto cmdXDefined
:cmdX
%*
if errorlevel 1 goto cmdXError
goto :eof
:cmdXError
echo "Error: %ACTION%"
exit 1
:cmdXDefined

if not "%ACTION%" == "make" goto :eof

call :cmdX xyo-cc --mode=%ACTION% --source-has-archive openssl

if not exist temp\ mkdir temp

set INCLUDE=%XYO_PATH_REPOSITORY%\include;%INCLUDE%
set LIB=%XYO_PATH_REPOSITORY%\lib;%LIB%
set PATH=%XYO_PATH_REPOSITORY%\opt\perl\bin;%PATH%
set WORKSPACE_PATH=%CD%
set WORKSPACE_PATH_BUILD=%WORKSPACE_PATH%\temp

if exist %WORKSPACE_PATH_BUILD%\build.done.flag goto :eof

pushd "source"

SET CMD_CONFIG=perl Configure threads
SET CMD_CONFIG=%CMD_CONFIG% --prefix="%WORKSPACE_PATH_BUILD%\openssl"
SET CMD_CONFIG=%CMD_CONFIG% --openssldir="%WORKSPACE_PATH_BUILD%\ssl"
SET CMD_CONFIG=%CMD_CONFIG% --with-zlib-lib=libz.lib zlib

if "%XYO_PLATFORM%" == "win64-msvc-2022" SET CMD_CONFIG=%CMD_CONFIG% VC-WIN64A
if "%XYO_PLATFORM%" == "win32-msvc-2022" SET CMD_CONFIG=%CMD_CONFIG% VC-WIN32

if "%XYO_PLATFORM%" == "win64-msvc-2019" SET CMD_CONFIG=%CMD_CONFIG% VC-WIN64A
if "%XYO_PLATFORM%" == "win32-msvc-2019" SET CMD_CONFIG=%CMD_CONFIG% VC-WIN32

if "%XYO_PLATFORM%" == "win64-msvc-2017" SET CMD_CONFIG=%CMD_CONFIG% VC-WIN64A
if "%XYO_PLATFORM%" == "win32-msvc-2017" SET CMD_CONFIG=%CMD_CONFIG% VC-WIN32

%CMD_CONFIG%
if errorlevel 1 goto makeError

nmake -f makefile all
if errorlevel 1 goto makeError
nmake -f makefile install
if errorlevel 1 goto makeError
nmake -f makefile clean
if errorlevel 1 goto makeError

SET CMD_CONFIG=perl Configure threads no-shared
SET CMD_CONFIG=%CMD_CONFIG% --prefix="%WORKSPACE_PATH_BUILD%\openssl.static"
SET CMD_CONFIG=%CMD_CONFIG% --openssldir="%WORKSPACE_PATH_BUILD%\ssl.static"
SET CMD_CONFIG=%CMD_CONFIG% --with-zlib-lib=libz.lib zlib

if "%XYO_PLATFORM%" == "win64-msvc-2022" SET CMD_CONFIG=%CMD_CONFIG% VC-WIN64A
if "%XYO_PLATFORM%" == "win32-msvc-2022" SET CMD_CONFIG=%CMD_CONFIG% VC-WIN32

if "%XYO_PLATFORM%" == "win64-msvc-2019" SET CMD_CONFIG=%CMD_CONFIG% VC-WIN64A
if "%XYO_PLATFORM%" == "win32-msvc-2019" SET CMD_CONFIG=%CMD_CONFIG% VC-WIN32

if "%XYO_PLATFORM%" == "win64-msvc-2017" SET CMD_CONFIG=%CMD_CONFIG% VC-WIN64A
if "%XYO_PLATFORM%" == "win32-msvc-2017" SET CMD_CONFIG=%CMD_CONFIG% VC-WIN32

%CMD_CONFIG%
if errorlevel 1 goto makeError

nmake -f makefile all
if errorlevel 1 goto makeError
nmake -f makefile install
if errorlevel 1 goto makeError
nmake -f makefile clean
if errorlevel 1 goto makeError

goto buildDone

:makeError
popd
echo "Error: make"
exit 1

:buildDone
popd
echo done > %WORKSPACE_PATH_BUILD%\build.done.flag
