select *
from cringegram.public.user;

select *
from cringegram.public.post;

select *
from cringegram.public.subscription;

select *
from cringegram.public.like;

select *
from cringegram.public.comment;

drop table cringegram.public.like;
drop table cringegram.public.comment;
drop table cringegram.public.post;
drop table cringegram.public.subscription;
drop table cringegram.public.user;

truncate cringegram.public.user;
truncate cringegram.public.post;
truncate cringegram.public.subscription;
truncate cringegram.public.like;
truncate cringegram.public.comment;