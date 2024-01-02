// Created by Grigore Stefan <g_stefan@yahoo.com>
// Public domain (Unlicense) <http://unlicense.org>
// SPDX-FileCopyrightText: 2022-2024 Grigore Stefan <g_stefan@yahoo.com>
// SPDX-License-Identifier: Unlicense

messageAction("install");

exitIf(!Shell.copyDirRecursively("output/bin", pathRepository + "/bin"));
exitIf(!Shell.copyDirRecursively("output/include", pathRepository + "/include"));
exitIf(!Shell.copyDirRecursively("output/lib", pathRepository + "/lib"));
exitIf(!Shell.copyDirRecursively("output/ssl", pathRepository + "/ssl"));

