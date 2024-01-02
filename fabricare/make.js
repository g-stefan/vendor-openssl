// Created by Grigore Stefan <g_stefan@yahoo.com>
// Public domain (Unlicense) <http://unlicense.org>
// SPDX-FileCopyrightText: 2022-2024 Grigore Stefan <g_stefan@yahoo.com>
// SPDX-License-Identifier: Unlicense

Fabricare.include("vendor");

messageAction("make");

if (Shell.fileExists("temp/build.done.flag")) {
	return;
};

if (!Shell.directoryExists("source")) {
	exitIf(Shell.system("7z x -aoa archive/" + Project.vendor + ".7z"));
	Shell.rename(Project.vendor, "source");
};

Shell.mkdirRecursivelyIfNotExists("output");
Shell.mkdirRecursivelyIfNotExists("output/bin");
Shell.mkdirRecursivelyIfNotExists("output/include");
Shell.mkdirRecursivelyIfNotExists("output/lib");
Shell.mkdirRecursivelyIfNotExists("temp");
Shell.mkdirRecursivelyIfNotExists("temp/bin");
Shell.mkdirRecursivelyIfNotExists("temp/include");
Shell.mkdirRecursivelyIfNotExists("temp/lib");

var outputPath=Shell.getcwd()+"\\temp";

runInPath("source",function(){

	Shell.setenv("PATH", pathRepository + "\\opt\\perl\\bin;" + Shell.getenv("PATH"));

	cmdConfig="perl Configure threads";
	cmdConfig+=" --prefix=\""+outputPath+"\"";
	cmdConfig+=" --openssldir=\""+outputPath+"\\ssl\"";
	cmdConfig+=" --with-zlib-lib=libz.lib zlib";

	if (Platform.name.indexOf("win64") >= 0) {
		cmdConfig+=" VC-WIN64A";
	}else{
		cmdConfig+=" VC-WIN32";
	};	

	exitIf(Shell.system(cmdConfig));

	exitIf(Shell.system("nmake -f makefile all"));
	exitIf(Shell.system("nmake -f makefile install"));
	exitIf(Shell.system("nmake -f makefile clean"));


	cmdConfig="perl Configure threads no-shared";
	cmdConfig+=" --prefix=\""+outputPath+"\\static\"";
	cmdConfig+=" --openssldir=\""+outputPath+"\\static\\ssl\"";
	cmdConfig+=" --with-zlib-lib=libz.lib zlib";

	if (Platform.name.indexOf("win64") >= 0) {
		cmdConfig+=" VC-WIN64A";
	}else{
		cmdConfig+=" VC-WIN32";
	};	

	exitIf(Shell.system(cmdConfig));

	exitIf(Shell.system("nmake -f makefile all"));
	exitIf(Shell.system("nmake -f makefile install"));
	exitIf(Shell.system("nmake -f makefile clean"));

});

Shell.copyFilesToDirectory("temp/bin/*.exe", "output/bin");
Shell.copyFilesToDirectory("temp/bin/*.dll", "output/bin");
Shell.copyDirRecursively("temp/include", "output/include");
Shell.copyFilesToDirectory("temp/lib/*.lib", "output/lib");
Shell.copyFilesToDirectory("temp/lib/engines-1_1/*.dll", "output/bin");
Shell.copyDirRecursively("temp/ssl", "output/ssl");
Shell.copyFile("temp/static/lib/libcrypto.lib", "output/lib/libcrypto.static.lib");
Shell.copyFile("temp/static/lib/libssl.lib", "output/lib/libssl.static.lib");

Shell.filePutContents("temp/build.done.flag", "done");
