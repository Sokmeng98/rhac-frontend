export type Branch = {
	id: string
	google_map: string
	image: string
	in_pp: boolean
	name_kh: string
	name_en: string
	location_kh: string
	location_en: string
	origin: { lat: number; lng: number }
	tel_smart: string
	tel_celcard: string
	tel_metfone: string
	tel: string[]
}

const branches: Branch[] = [
	{
		id: '1',
		google_map: 'https://goo.gl/maps/MG9JiMhShVCr8fT46',
		image: '/img/branch/1.PNG',
		in_pp: true,
		name_kh: 'គ្លីនិករ៉ាក់ ផ្សារដេប៉ូ',
		name_en: 'Clinic RHAC Depo Market',
		location_kh: 'ផ្ទះលេខ៦ ផ្លូវលេខ១៥០ សង្កាត់វាលវង់ ខណ្ឌ៧មករា ភ្នំពេញ',
		location_en: '#6, Street 150, Sangkat Veal Vong, Khan 7Makara, PP',
		origin: { lat: 11.565113345728362, lng: 104.90778376828426 },
		tel_smart: '016 740 994',
		tel_celcard: '077 995 394',
		tel_metfone: '088 831 1157',
		tel: ['016 740 994', '077 995 394', '088 831 1157']
	},
	{
		id: '2',
		google_map: 'https://goo.gl/maps/QDHRxa1cy83JZ9u57',
		image: '/img/branch/ToulTompoung.jpg',
		in_pp: true,
		name_kh: 'គ្លីនិករ៉ាក់ ទួលទំពូង',
		name_en: 'Clinic RHAC Toul Tompoung',
		location_kh: 'ផ្ទះលេខ៦២ ផ្លូវលេខ៤៣២ ទួលទំពូង១ ខណ្ឌចំការមន ភ្នំពេញ',
		location_en: '#62, Streetreet 432, Sangkat Toul Tompung1, Khan Chamkarmorn, PP',
		origin: { lat: 11.541418569939015, lng: 104.91140456071423 },
		tel_smart: '096 723 6281',
		tel_celcard: '085 777 458',
		tel_metfone: '097 842 6368',
		tel: ['096 723 6281', '085 777 458', '097 842 6368']
	},
	{
		id: '3',
		google_map:
			'https://www.google.com.kh/maps/place/RHAC/@11.532006,104.854765,17z/data=%213m1%214b1%214m2%213m1%211s0x31095024f22b6e33:0x28cf53c7061fb7c0',
		image: '/img/branch/TrapaingThleung.jpg',
		in_pp: true,
		name_kh: 'គ្លីនិករ៉ាក់ ត្រពាំងថ្លឹង',
		name_en: 'Clinic RHAC Trapaing Thleung',
		location_kh: 'ផ្ទះលេខ ១៩.២០.២១ ភូមិត្រពាំងថ្លឹង សង្កាត់ចោមចៅ១ ខណ្ឌពោធី៍សែនជ័យ ភ្នំពេញ',
		location_en: '#19.20.21, Trapaing Thleung Village, Sangkat Chom Chao 1, Khan Por Senchey, PP',
		origin: { lat: 11.5320417, lng: 104.8546001 },
		tel_smart: '096 723 1873',
		tel_celcard: '085 777 461',
		tel_metfone: '097 842 6205',
		tel: ['096 723 1873', '085 777 461', '097 842 6205']
	},
	{
		id: '4',
		google_map: 'https://maps.app.goo.gl/BYybn4mwV2DbKPQ6A?g_st=ic',
		image: '/img/branch/ChakAngreKhroum.jpg',
		in_pp: true,
		name_kh: 'គ្លីនិករ៉ាក់ ចាក់អង្រែក្រោម',
		name_en: 'Clinic RHAC Chak Angre Khroum',
		location_kh: 'ផ្ទះលេខ S30-S31 មហាវិថីសម្តេចហ៊ុននាង សង្កាត់ចាក់អង្រែក្រោម ខណ្ឌមានជ័យ ភ្នំពេញ',
		location_en: '#S30-S31, Toulroka Village, Sangkat Chank Angre Kraom, Khan Mean Chey, PP',
		origin: { lat: 11.512654, lng: 104.932164 },
		tel_smart: '096 280 7213',
		tel_celcard: '085 777 506',
		tel_metfone: '097 842 6103',
		tel: ['096 280 7213', '085 777 506', '097 842 6103']
	},
	{
		id: '5',
		google_map: 'https://goo.gl/maps/RqrEn2LaQzJ6xhXs5',
		image: '/img/branch/ResseyKeo.jpg',
		in_pp: true,
		name_kh: 'គ្លីនិករ៉ាក់ ឬស្សីកែវ',
		name_en: 'Clinic RHAC Ressey Keo',
		location_kh: 'ផ្ទះលេខB1-2B ផ្លូវជាតិលេខ ៥ ភូមិមិត្តភាព  សង្កាត់ឬស្សីកែវ ខណ្ឌឬស្សីកែវ ភ្នំពេញ',
		location_en:
			'#B1-2B, National Road N5, Methapheap Village, Sangkat Reusey Keo, Khan Reusey Keao, PP',
		origin: { lat: 11.609100465152261, lng: 104.91763895223791 },
		tel_smart: '096 779 1851',
		tel_celcard: '085 777 454',
		tel_metfone: '097 767 0008',
		tel: ['096 779 1851', '085 777 454', '097 767 0008']
	},
	{
		id: '6',
		google_map: 'https://goo.gl/maps/RhUvG9DYzPWSWepFA',
		image: '/img/branch/TeukThla.jpg',
		in_pp: true,
		name_kh: 'គ្លីនិករ៉ាក់ ទឹកថ្លា',
		name_en: 'Clinic RHAC Teuk Thla',
		location_kh: 'ផ្ទះលេខ G35-G37 ផ្លូវហ្គូដឌី សង្កាត់ទឹកថ្លា ខណ្ឌសែនសុខ',
		location_en: '#G35-G37, Street Goldy, Sangkat Teuk Thla, Khan Sen Sok, PP',
		origin: { lat: 11.56156899553575, lng: 104.87331732764221 },
		tel_smart: '096 280 6973',
		tel_celcard: '085 777 490',
		tel_metfone: '097 842 6073',
		tel: ['096 280 6973', '085 777 490', '097 842 6073']
	},
	{
		id: '7',
		google_map: 'https://goo.gl/maps/F3yajP1vska3Dasj6',
		image: '/img/branch/SteungMeanchey.jpg',
		in_pp: true,
		name_kh: 'គ្លី​និករ៉ាក់ ស្ទឹងមានជ័យ',
		name_en: 'Clinic RHAC Steung Meanchey',
		location_kh:
			'ផ្ទះលេខ 10R-11R ផ្លូវមុន្នីរ៉េត ភូមិដំណាក់ធំ១ សង្កាត់ស្ទឹងមានជ័យ ខណ្ឌមានជ័យ ភ្នំពេញ',
		location_en:
			'#10R-11R, Street Monireth, Damnak Thom1 Village, Sangkat Steung Mean Chey, Khan Mean Chey, PP',
		origin: { lat: 11.532825, lng: 104.886116 },
		tel_smart: '069 829 097',
		tel_celcard: '089 873 897',
		tel_metfone: '097 842 6315',
		tel: ['069 829 097', '089 873 897', '097 842 6315']
	},
	{
		id: '8',
		google_map: 'https://goo.gl/maps/snXX5tapdy5jxNor8',
		image: '/img/branch/Odem.jpg',
		in_pp: true,
		name_kh: 'គ្លី​និករ៉ាក់ អូរឌឹម',
		name_en: 'Clinic RHAC Odem',
		location_kh: 'ផ្ទះលេខ B03-B04 ផ្លូវបេតុងលេខ ២ ភូមិអូរឌឹម សង្កាត់ចោមចៅ ខណ្ឌពោធិ៍សែនជ័យ ភ្នំពេញ។',
		location_en: '#B03-B04, Street 2, Odem Village, Sangkat Chom Chav, Khan Porsenchey, PP',
		origin: { lat: 11.531842442983917, lng: 104.81039984105924 },
		tel_smart: '096 996 9176',
		tel_celcard: '078 277 823',
		tel_metfone: '097 455 6996',
		tel: ['096 996 9176', '078 277 823', '097 455 6996']
	},
	{
		id: '9',
		google_map: 'https://goo.gl/maps/Fodzamz5CiWmkaH8A',
		image: '/img/branch/Battambang.jpg',
		in_pp: false,
		name_kh: 'គ្លីនិករ៉ាក់ ខេត្តបាត់ដំបង',
		name_en: 'Clinic RHAC Battambang',
		location_kh:
			'គ្លីនិក/មណ្ឌលយុវវ័យ៖ ផ្ទះលេខ១៥៤ ផ្លូវ៥២៤ ភូមិព្រែកមហាទេព ឃុំស្វាយប៉ោ ស្រុកបាត់ដំបង',
		location_en:
			'Clinic/Youth Center:  #154, Street 524, Prek Mohatep Village, Svay Poar Commune, Battambang District',
		origin: { lat: 13.108033045827932, lng: 103.19673229613275 },
		tel_smart: '096 280 7841',
		tel_celcard: '011 683 579',
		tel_metfone: '097 842 5935',
		tel: ['096 280 7841', '011 683 579', '097 842 5935']
	},
	{
		id: '10',
		google_map: 'https://goo.gl/maps/D9ezncyrostuo7M97',
		image: '/img/branch/Sihanouk.JPG',
		in_pp: false,
		name_kh: 'គ្លីនិករ៉ាក់ ខេត្តព្រះសីហនុ',
		name_en: 'Clinic RHAC Sihanouk',
		location_kh: 'ផ្ទះលេខ៥៦ ផ្លូវ២០៦ ក្រុម៤ សង្កាត់៤ ក្រុងព្រះសីហនុ​​ ខេត្តព្រះសីហនុ',
		location_en: '#56, Street 206, Sangkat 4, Preah Sihanouk Town, Preah Sihanouk Province',
		origin: { lat: 10.617938042297627, lng: 103.528161839458 },
		tel_smart: '096 280 7906',
		tel_celcard: '085 777 491',
		tel_metfone: '097 842 6236',
		tel: ['096 280 7906', '085 777 491', '097 842 6236']
	},
	{
		id: '11',
		google_map: 'https://goo.gl/maps/tthCx2qvhxFaLcCF9',
		image: '/img/branch/KampongCham.jpg',
		in_pp: false,
		name_kh: 'គ្លីនិករ៉ាក់ ខេត្តកំពង់ចាម',
		name_en: 'Clinic RHAC Kampong Cham',
		location_kh: 'ផ្ទះលេខ១០ ផ្លូវត្រសក់ផ្អែម ភូមិ១៥ ឃុំកំពង់ចាម ស្រុកកំពង់ចាម',
		location_en:
			'#10, Street Trasok Pha Em, 15 Village, Kampong Cham Commune, Kampong Cham District',
		origin: { lat: 11.996221265013013, lng: 105.46345385382413 },
		tel_smart: '096 280 3911',
		tel_celcard: '085 777 462',
		tel_metfone: '097 842 6496',
		tel: ['096 280 3911', '085 777 462', '097 842 6496']
	},
	{
		id: '12',
		google_map: 'https://goo.gl/maps/bqQmsDrnvBYn2QVXA',
		image: '/img/branch/Takeo.jpg',
		in_pp: false,
		name_kh: 'គ្លីនិករ៉ាក់ ខេត្តតាកែវ',
		name_en: 'Clinic RHAC Takeo',
		location_kh: 'ផ្ទះលេខ៥ ផ្លូវលេខ៨ ភូមិឡូរី សង្កាត់រការក្នុង ក្រុងដូនកែវ',
		location_en: '#5, Street 8, Lory village, Rokar khnong commune, Daun Keo district',
		origin: { lat: 10.988556834356965, lng: 104.78362414172547 },
		tel_smart: '096 279 1958',
		tel_celcard: '085 777 452',
		tel_metfone: '097 842 6524',
		tel: ['096 279 1958', '085 777 452', '097 842 6524']
	},
	{
		id: '13',
		google_map: 'https://goo.gl/maps/sytqcwitcR4nHYYu5',
		image: '/img/branch/SiemReap.PNG',
		in_pp: false,
		name_kh: 'គ្លីនិក​រ៉ាក់ ខេត្តសៀមរាប',
		name_en: 'Clinic RHAC Siem Reap',
		location_kh: 'គ្លីនិក/មណ្ឌលយុវវ័យ៖ ភូមិត្រពាំងសេះ ឃុំគោកចក',
		location_en: 'Clinic/Youth Center: Trapaing Ses Village, Kok Chak commune',
		origin: { lat: 13.380664171806794, lng: 103.85998354723876 },
		tel_smart: '096 723 1528',
		tel_celcard: '085 777 497',
		tel_metfone: '097 842 6245',
		tel: ['096 723 1528', '085 777 497', '097 842 6245']
	},
	{
		id: '14',
		google_map: 'https://maps.app.goo.gl/nF1uADaCjiumDdwL6?g_st=ic',
		image: '/img/branch/KampongSpeu.jpg',
		in_pp: false,
		name_kh: 'គ្លីនិករ៉ាក់ ខេត្តកំពង់ស្ពឺ',
		name_en: 'Clinic RHAC Kampong Speu',
		location_kh: 'ភូមិស្នោរទី១ សង្កាត់រកាធំ ក្រុងច្បារមន',
		location_en: 'Snaor1 Village, Rokarthom Commune, Chbar Morn District',
		origin: { lat: 11.473622299934863, lng: 104.54828866437265 },
		tel_smart: '096 280 6971',
		tel_celcard: '085 777 498',
		tel_metfone: '097 842 5898',
		tel: ['096 280 6971', '085 777 498', '097 842 5898']
	},
	{
		id: '15',
		google_map: 'https://maps.app.goo.gl/3r6hux7en3uKf24S6?g_st=ic',
		image: '/img/branch/Kampot.jpg',
		in_pp: false,
		name_kh: 'គ្លីនិករ៉ាក់ ខេត្តកំពត',
		name_en: 'Clinic RHAC Kampot',
		location_kh:
			'គ្លីនិក/មណ្ឌលយុវវ័យ៖ ផ្លូវជាតិលេខ ៣ ភូមិកំពង់គ្រែង ឃុំកំពង់គ្រែង ស្រុកទឹកឈូ ខេត្តកំពត',
		location_en:
			'Clinic / Youth Center: National Road 3, Kampong Kreng Village, Kampong Kreng Commune, Teuk Chhou District, Kampot Province',
		origin: { lat: 10.631654, lng: 104.183166 },
		tel_smart: '096 280 7415',
		tel_celcard: '085 777 459',
		tel_metfone: '097 842 5849',
		tel: ['096 280 7415', '085 777 459', '097 842 5849']
	}
]

export const branchCount = branches.length

export { branches }
