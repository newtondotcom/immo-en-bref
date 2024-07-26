interface Links {
	self: string;
	git: string;
	html: string;
}

export interface Content {
	name: string;
	path: string;
	sha: string;
	size: number;
	url: string;
	html_url: string;
	git_url: string;
	download_url: string;
	type: string;
	_links: Links;
}

export interface Author {
	date: string;
	name: string;
	email: string;
}

export interface Committer {
	date: string;
	name: string;
	email: string;
}

export interface Tree {
	url: string;
	sha: string;
}

export interface Parent {
	url: string;
	html_url: string;
	sha: string;
}

export interface Verification {
	verified: boolean;
	reason: string;
	signature: string | null;
	payload: string | null;
}

export interface Commit {
	sha: string;
	node_id: string;
	url: string;
	html_url: string;
	author: Author;
	committer: Committer;
	message: string;
	tree: Tree;
	parents: Parent[];
	verification: Verification;
}

export interface FileCommit {
	content: Content | null;
	commit: Commit;
}
