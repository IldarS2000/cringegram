create or replace procedure add_user(arg_phone_number char(15),
                                     arg_name varchar(20),
                                     arg_access_token text,
                                     arg_refresh_token text)
    language plpgsql
as
$$
begin
    insert into cringegram.public.user(phone_number, name, access_token, refresh_token)
    values (arg_phone_number, arg_name, arg_access_token, arg_refresh_token);
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

create or replace procedure add_like(arg_post_id int,
                                     arg_user_id int)
    language plpgsql
as
$$
begin
    insert into cringegram.public.like(post_id, user_id)
    values (arg_post_id, arg_user_id);
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

