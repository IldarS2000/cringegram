import {Post} from "../interfaces/post";

const photo1 = 'https://instagram.fppk1-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.180.1440.1440a/s640x640/124233276_664347264272986_3296005098266053700_n.jpg?_nc_ht=instagram.fppk1-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=_Nnt29THKeAAX8RVFdX&tn=AWvo877xyMM5JyUU&edm=ABfd0MgBAAAA&ccb=7-4&oh=6ed6e3fef32a421203ce175a94032c7a&oe=61449328&_nc_sid=7bff83';

const photo2 = 'https://instagram.fppk1-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/205505441_3307342936183777_2736974089468975774_n.jpg?_nc_ht=instagram.fppk1-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=gm73mt7g1ScAX8SVKiH&edm=AP_V10EBAAAA&ccb=7-4&oh=95665a7d4ab3b49aaa38dc5cf3e83fa9&oe=6145C42D&_nc_sid=4f375e';

const photo3 = 'https://instagram.fppk1-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/59914460_166649424359236_7407772761192774757_n.jpg?_nc_ht=instagram.fppk1-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=_TXbircYsE8AX82FvwT&edm=AP_V10EBAAAA&ccb=7-4&oh=268913c8c33dd1660b6b845c82360000&oe=6144FE6A&_nc_sid=4f375e';

const photo4 = 'https://instagram.fppk1-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/206843963_1127652371079255_2992426770500227697_n.jpg?_nc_ht=instagram.fppk1-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=hpFlueJGFn4AX9cllN6&edm=AP_V10EBAAAA&ccb=7-4&oh=84a2a1c89c0141a6cb6c49ba72e7d8d5&oe=614447ED&_nc_sid=4f375e';

const photo5 = 'https://instagram.fppk1-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/130902190_1161189904282770_4931917388275324154_n.jpg?_nc_ht=instagram.fppk1-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=Oe5fuXUYVdoAX9DXRtL&edm=AP_V10EBAAAA&ccb=7-4&oh=9942217b1f79f907106c5b6b388af196&oe=6145B581&_nc_sid=4f375e';

const photo6 = 'https://instagram.fppk1-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/121032287_200213084807477_6082524973964978471_n.jpg?_nc_ht=instagram.fppk1-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=tFWB5GsAC18AX8uZ0uz&edm=AP_V10EBAAAA&ccb=7-4&oh=60c959130a02a5f2e54af95c54f975b8&oe=6145E208&_nc_sid=4f375e';

const photo7 = 'https://instagram.fppk1-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/122068372_636039760344297_2689820219198689723_n.jpg?_nc_ht=instagram.fppk1-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=pHU1_bGY6J0AX-GjlEk&tn=AWvo877xyMM5JyUU&edm=AP_V10EBAAAA&ccb=7-4&oh=2ae5f76d39e3536d7aaeb5679b0aa4d0&oe=61454AEE&_nc_sid=4f375e';

export const getMockUserPosts = async (): Promise<Post[]> => {

    await new Promise((resolve) => setTimeout(() => {resolve()}, 1000));

    return [
        {
            id: 1,
            userId: 1,
            description: 'первый пост',
            likeCount: 1,
            photo: photo1
        },
        {
            id: 2,
            userId: 1,
            likeCount: 0,
            photo: photo2
        },
        {
            id: 3,
            userId: 1,
            description: 'ахаха',
            likeCount: 0,
            photo: photo3
        },
        {
            id: 4,
            userId: 1,
            description: 'пост4',
            likeCount: 0,
            photo: photo4
        },
        {
            id: 5,
            userId: 1,
            likeCount: 0,
            photo: photo5
        },
        {
            id: 6,
            userId: 1,
            description: 'описание',
            likeCount: 0,
            photo: photo6
        },
        {
            id: 7,
            userId: 1,
            description: 'свадьба',
            likeCount: 0,
            photo: photo7
        },
    ]
};
