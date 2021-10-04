create table cringegram.public.user
(
    id                 serial primary key,
    username           varchar(30) unique,
    email              varchar(256) not null unique,
    password           varchar(128) not null,
    avatar             bytea,
    about_me           varchar(128),
    post_count         int          not null,
    subscriber_count   int          not null,
    subscription_count int          not null
);

create table cringegram.public.post
(
    id               serial primary key,
    user_id          int       not null references cringegram.public.user (id),
    create_timestamp timestamp not null,
    photo            bytea     not null,
    description      varchar(512),
    like_count       int       not null
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