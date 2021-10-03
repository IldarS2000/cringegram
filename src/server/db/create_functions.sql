create or replace function ret_user(arg_user_id int)
    returns table
            (
                username           varchar(20),
                avatar             bytea,
                about_me           varchar(64),
                post_count         int,
                subscriber_count   integer,
                subscription_count integer
            )
    language plpgsql
as
$$
begin
    return query
        select username, avatar, about_me, post_count, subscriber_count, subscription_count
        from cringegram.public."user"
        where id = arg_user_id;
end;
$$;

create or replace function ret_user_credentials(arg_user_id int)
    returns table
            (
                email    varchar(256),
                password varchar(128)
            )
    language plpgsql
as
$$
begin
    return query
        select email, password
        from cringegram.public."user"
        where id = arg_user_id;
end;
$$;

create or replace function ret_user_subscriber(arg_user_id int)
    returns table
            (
                subscriber_id int
            )
    language plpgsql
as
$$
begin
    return query
        select subscriber_id
        from cringegram.public.subscription
        where user_id = arg_user_id;
end;
$$;

create or replace function ret_user_subscription(arg_user_id int)
    returns table
            (
                user_id int
            )
    language plpgsql
as
$$
begin
    return query
        select user_id
        from cringegram.public.subscription
        where subscriber_id = arg_user_id;
end;
$$;

create or replace function ret_post(arg_user_id int)
    returns table
            (
                create_timestamp timestamp,
                photo            bytea,
                description      varchar(512),
                like_count       int
            )
    language plpgsql
as
$$
begin
    return query
        select create_timestamp, photo, description, like_count
        from cringegram.public.post
        where user_id = arg_user_id;
end;
$$;

create or replace function ret_comment(arg_user_id int,
                                       arg_post_id int)
    returns table
            (
                comment varchar(128)
            )
    language plpgsql
as
$$
begin
    return query
        select comment
        from cringegram.public.comment
        where user_id = arg_user_id
          and post_id = arg_post_id;
end;
$$;

create or replace function ret_like(arg_post_id int)
    returns table
            (
                user_id int
            )
    language plpgsql
as
$$
begin
    return query
        select user_id
        from cringegram.public.like
        where post_id = arg_post_id;
end;
$$;