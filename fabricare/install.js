// Created by Grigore Stefan <g_stefan@yahoo.com>
// Public domain (Unlicense) <http://unlicense.org>
// SPDX-FileCopyrightText: 2022 Grigore Stefan <g_stefan@yahoo.com>
// SPDX-License-Identifier: Unlicense

messageAction("install");

Shell.copyFilesToDirectory("output/bin/*.exe", pathRepository + "/bin");
Shell.copyFilesToDirectory("output/bin/*.dll", pathRepository + "/bin");
Shell.copyDirRecursively("output/include", pathRepository + "/include");
Shell.copyFilesToDirectory("output/lib/*.lib", pathRepository + "/lib");
Shell.copyFilesToDirectory("output/lib/engines-1_1/*.dll", pathRepository + "/bin");
Shell.copyDirRecursively("output/ssl", pathRepository + "/ssl");
Shell.copyFile("output/static/lib/libcrypto.lib", pathRepository + "/lib/libcrypto.static.lib");
Shell.copyFile("output/static/lib/libssl.lib", pathRepository + "/lib/libssl.static.lib");
