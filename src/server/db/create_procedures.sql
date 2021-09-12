-- user
create or replace procedure add_user(arg_phone_number char(15),
                                     arg_name varchar(20),
                                     arg_access_token text,
                                     arg_refresh_token text)
    language plpgsql
as
$$
begin
    insert into cringegram.public.user(phone_number, name, post_count, subscription_count,
                                       access_token, refresh_token)
    values (arg_phone_number, arg_name, 0, 0, arg_access_token, arg_refresh_token);
end;
$$;

create or replace procedure del_user(arg_user_id int)
    language plpgsql
as
$$
begin
    delete
    from cringegram.public.user
    where id = arg_user_id;
end;
$$;

create or replace procedure mod_user_avatar(arg_user_id int,
                                            arg_avatar bytea)
    language plpgsql
as
$$
begin
    update cringegram.public.user
    set avatar = arg_avatar
    where id = arg_user_id;
end;
$$;

create or replace procedure mod_user_about_me(arg_user_id int,
                                              arg_about_me varchar(64))
    language plpgsql
as
$$
begin
    update cringegram.public.user
    set about_me = arg_about_me
    where id = arg_user_id;
end;
$$;

create or replace procedure mod_user_tokens(arg_user_id int,
                                            arg_access_token text,
                                            arg_refresh_token text)
    language plpgsql
as
$$
begin
    update cringegram.public.user
    set access_token  = arg_access_token,
        refresh_token = arg_refresh_token
    where id = arg_user_id;
end;
$$;

-- like
create or replace procedure add_like(arg_post_id int,
                                     arg_user_id int)
    language plpgsql
as
$$
begin
    insert into cringegram.public.like(post_id, user_id)
    values (arg_post_id, arg_user_id);

    update cringegram.public.post
    set like_count = like_count + 1
    where id = arg_post_id;
end;
$$;

create or replace procedure del_like(arg_post_id int,
                                     arg_user_id int)
    language plpgsql
as
$$
begin
    delete
    from cringegram.public.like
    where post_id = arg_post_id
      and user_id = arg_user_id;

    update cringegram.public.post
    set like_count = like_count - 1
    where id = arg_post_id;
end;
$$;

-- post
create or replace procedure add_post(arg_user_id int,
                                     arg_photo bytea,
                                     arg_description varchar(512))
    language plpgsql
as
$$
begin
    insert into cringegram.public.post(user_id, photo, description, like_count)
    values (arg_user_id, arg_photo, arg_description, 0);

    update cringegram.public."user"
    set post_count = post_count + 1
    where id = arg_user_id;
end;
$$;

create or replace procedure del_post(arg_post_id int,
                                     arg_user_id int)
    language plpgsql
as
$$
begin
    delete
    from cringegram.public.post
    where id = arg_post_id;

    update cringegram.public."user"
    set post_count = post_count - 1
    where id = arg_user_id;
end;
$$;

create or replace procedure mod_post_description(arg_post_id int,
                                                 arg_description varchar(512))
    language plpgsql
as
$$
begin
    update cringegram.public.post
    set description = arg_description
    where id = arg_post_id;
end;
$$;

-- comment
create or replace procedure add_post_comment(arg_post_id int,
                                             arg_user_id int,
                                             arg_comment varchar(128))
    language plpgsql
as
$$
begin
    insert into cringegram.public.comment(post_id, user_id, comment)
    values (arg_post_id, arg_user_id, arg_comment);
end;
$$;

create or replace procedure del_post_comment(arg_comment_id int)
    language plpgsql
as
$$
begin
    delete
    from cringegram.public.comment
    where id = arg_comment_id;
end;
$$;

create or replace procedure mod_post_comment(arg_comment_id int,
                                             arg_comment varchar(128))
    language plpgsql
as
$$
begin
    update cringegram.public.comment
    set comment = arg_comment
    where id = arg_comment_id;
end;
$$;

-- subscription
create or replace procedure add_subscription(arg_user_id int,
                                             arg_subscriber_id int)
    language plpgsql
as
$$
begin
    insert into cringegram.public.subscription(user_id, subscriber_id)
    values (arg_user_id, arg_subscriber_id);

    update cringegram.public.user
    set subscription_count = subscription_count + 1
    where id = arg_user_id;
end;
$$;

create or replace procedure del_subscription(arg_user_id int,
                                             arg_subscriber_id int)
    language plpgsql
as
$$
begin
    delete
    from cringegram.public.subscription
    where user_id = arg_user_id
      and subscriber_id = arg_subscriber_id;

    update cringegram.public.user
    set subscription_count = subscription_count - 1
    where id = arg_user_id;
end;
$$;



