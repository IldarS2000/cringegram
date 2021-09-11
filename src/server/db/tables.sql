create database cringegram;

create table cringegram.public.user
(
    id            serial primary key,
    phone_number  char(15)    not null unique,
    name          varchar(20) not null unique,
    avatar        bytea,
    about_me      varchar(64),
    access_token  text        not null,
    refresh_token text        not null
);

create table cringegram.public.post
(
    id          serial primary key,
    user_id     int   not null references cringegram.public.user (id),
    photo       bytea not null,
    description varchar(512),
    like_count  int   not null
);

create table cringegram.public.subscription
(
    user_id       int not null references cringegram.public.user (id),
    subscriber_id int not null references cringegram.public.user (id),

    primary key (user_id, subscriber_id)
);

create table cringegram.public.like
(
    post_id int not null references cringegram.public.post (id),
    user_id int not null references cringegram.public.user (id),

    primary key (post_id, user_id)
);

create table cringegram.public.comment
(
    id      serial primary key,
    post_id int          not null references cringegram.public.post (id),
    user_id int          not null references cringegram.public.user (id),
    comment varchar(128) not null
);
