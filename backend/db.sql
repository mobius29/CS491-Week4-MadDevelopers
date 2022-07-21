CREATE DATABASE Week4 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE Week4;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(20) NOT NULL UNIQUE,
    hashedPassword VARCHAR(300) NOT NULL,
    displayName VARCHAR(35) NOT NULL UNIQUE,
    selfInformation VARCHAR(330),
    profileImage VARCHAR(100) UNIQUE,
    createdAt TIMESTAMP NOT NULL DEFAULT current_timestamp(),
    isAdmin TINYINT NOT NULL DEFAULT 0,
    isDeleted TINYINT NOT NULL DEFAULT 0,
    starCount INT NOT NULL DEFAULT 0
);

CREATE TABLE Posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    authorId INT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT current_timestamp(),
    lastUpdated TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    isDeleted TINYINT NOT NULL DEFAULT 0,
  
    FOREIGN KEY (authorId) REFERENCES Users (id)
);

CREATE TABLE Tags (
    tag VARCHAR(100) PRIMARY KEY
);

CREATE TABLE PostTags (
    postId INT NOT NULL,
    tag VARCHAR(100) NOT NULL,

    FOREIGN KEY (postId) REFERENCES Posts (id),
    FOREIGN KEY (tag) REFERENCES Tags (tag),
    
    PRIMARY KEY (postId, tag)
);

CREATE TABLE Stars (
    followerId INT,
    followingId INT,

    FOREIGN KEY (followerId) REFERENCES Users(id),
    FOREIGN KEY (followingId) REFERENCES Users(id),

    PRIMARY KEY (followerId, followingId)
);

CREATE TABLE Comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    postId INT NOT NULL,
    userId INT NOT NULL,
    comment TEXT NOT NULL,
    parentCommentId INT DEFAULT NULL,

    FOREIGN KEY (postId) REFERENCES Posts(id),
    FOREIGN KEY (userId) REFERENCES Users(id)
);