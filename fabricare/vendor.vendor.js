// Created by Grigore Stefan <g_stefan@yahoo.com>
// Public domain (Unlicense) <http://unlicense.org>
// SPDX-FileCopyrightText: 2022 Grigore Stefan <g_stefan@yahoo.com>
// SPDX-License-Identifier: Unlicense

Project.vendor = Project.name + "-" + Project.version;

Shell.mkdirRecursivelyIfNotExists("archive");

// Self
if (Shell.fileExists("archive/" + Project.vendor + ".7z")) {
	if (Shell.getFileSize("archive/" + Project.vendor + ".7z") > 16) {
		return;
	};
	Shell.removeFile("archive/" + Project.vendor + ".7z");
};

Console.writeLn("curl --insecure --location https://github.com/g-stefan/vendor-" + Project.name + "/releases/download/v" + Project.version + "/" + Project.vendor + ".7z --output archive/" + Project.vendor + ".7z");
exitIf(Shell.system("curl --insecure --location https://github.com/g-stefan/vendor-" + Project.name + "/releases/download/v" + Project.version + "/" + Project.vendor + ".7z --output archive/" + Project.vendor + ".7z"));
if (Shell.getFileSize("archive/" + Project.vendor + ".7z") > 16) {
	return;
};
Shell.removeFile("archive/" + Project.vendor + ".7z");

// Source
runInPath("archive", function() {
	webLink = "https://github.com/openssl/openssl/archive/OpenSSL_1_1_1n.tar.gz";
	if (!Shell.fileExists(Project.vendor + ".tar.gz")) {
		exitIf(Shell.system("curl --insecure --location " + webLink + " --output " + Project.vendor + ".tar.gz"));
	};
	Shell.system("7z x " + Project.vendor + ".tar.gz -so | 7z x -aoa -si -ttar -o.");
	Shell.removeFile(Project.vendor + ".tar.gz");
	Shell.removeFile(Project.vendor + ".7z");
	Shell.removeFile("pax_global_header");
	Shell.rename("openssl-OpenSSL_1_1_1n","openssl-"+Project.version);
	exitIf(Shell.system("7z a -mx9 -mmt4 -r- -sse -w. -y -t7z " + Project.vendor + ".7z " + Project.vendor));
	forceRemoveDirRecursively(Project.vendor);
});

