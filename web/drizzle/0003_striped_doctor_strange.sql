CREATE TABLE `articles` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text,
	`subtitle` text,
	`publishedDate` text,
	`imageUrl` text,
	`tags` text,
	`excerpt` text,
	`readTime` text,
	`isFeatured` integer,
	`url` text
);
