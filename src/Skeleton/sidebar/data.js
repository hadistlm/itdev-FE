export const Data = {
    menus: [{
        header: true,
        name: 'Dashboard'
    },
    {
        name: 'Dashboard',
        active: true,
        icon: 'fas fa-tachometer-alt',
        url: "/"
    },
    {
        header: true,
        name: 'OCA Blast'
    },
    {
        dropdown: true,

        name: 'Whatsapp',
        icon: 'fab fa-whatsapp',
        children: [{
            name: 'Whatsapp Broadcast',
            url: '/whatsapp/broadcast'
        }, {
            name: 'Whatsapp Scheduler',
            url: '/whatsapp/scheduler'

        }, {
            name: 'Whatsapp Usages',
            url: '/whatsapp/usages'
        }]
    },
    {
        header: true,
        name: 'Config'
    },
    {
        dropdown: true,
        name: 'Contact Group',
        icon: 'fas fa-users',
        children: [{
            name: 'List',
            url: '/setting/contact/group/list'
        },
        {
            name: 'Add New',
            url: '/setting/contact/group/form'
        }]
    },
    {
        dropdown: true,
        name: 'Settings',
        icon: 'fas fa-cog',
        children: [{
            name: 'Variable Management',
            url: '/setting/variable'
        },
        {
            name: 'Main Setting',
            url: '/bootstrap/badge'
        }]
    }]
};