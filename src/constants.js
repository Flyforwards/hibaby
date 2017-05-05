export const PAGE_SIZE = 3;
export const positions = ["产品经理","项目经理","总经理","前端工程师"];
export const departments = ["信息管理部1","信息管理部2","信息管理部3","信息管理部4"];
export const locals = ["总部","地方"];
export const SystemRoles = ["普通员工","特殊员工"];
export const status = ["正常","异常"];
export const classification = [
{
	"name":"凯贝姆22",
	"titel":"凯贝姆11"
},{
	"name": '总部(113)',
	"titel":"总部",
	"children": [{
				"name":'总办 (113)',
				"titel":'总办',
				"children":[{
					"name":'总办1(113)',
					"titel":'总办1'
				},{
					"name":'总办2(113)',
					"titel":'总办2'
				}]
				},
				{
				"name":'财务部(113)',
				"titel":'财务部'
				}
			]
},	{
	"name": '北京',
	"titel":'北京',
	"children":[{
		"name":'总办',
		"titel":'总办'
		},
		{
		"name":'财务部',
		"titel":'财务部'
		}
	]},{
	"name": '河北',
	"titel":'河北',
	"children":[{
		"name":'财务部(111)',
		"titel":'财务部(111)'
		},
		{
		"name":'运营部(222)',
		"titel":'运营部(222)'
		}
	]},{
	"name": '天津',
	"titel":'天津',
	"children":[{
		"name":'财务部(111)',
		"titel":'财务部(111)'
		},
		{
		"name":'运营部(222)',
		"titel":'运营部(222)'
		}
	]},{
	"name": '河南',
	"titel":'河南',
	"children":[{
		"name":'财务部(111)',
		"titel":'财务部(111)',
		"children":[{
			"name":'财务部(333)',
			"titel":'财务部(111)'
		}]
		},
		{
		"name":'运营部(222)',
		"titel":'运营部(222)'
		}
	]},
];
export const aaa = [{
        module: 'crm',
        authority: '客户档案',
        name: '客户档案',
        path: '/xxxx/xxxx/xxx',
        people:'里方法'
      },{
        module: 'crm',
        authority: '客户档案',
        name: '客户档案',
        path: '/xxxx/xxxx/xxx',
        people:'里方法'
      }];
export const dataList = [{
    Numbering: 'a1234567',
    name: '李芳芳',
    position: '产品经理',
    department: '信息管理部',
    local: '总部',
    system: '普通员工',
    status: '正常',
},{
    Numbering: 'a666666',
    name: '李芳芳',
    position: '产品经理',
    department: '信息管理部',
    local: '总部',
    system: '普通员工',
    status: '正常',
},{
    Numbering: 'a666',
    name: '李芳芳',
    position: '产品经理',
    department: '信息管理部',
    local: '总部',
    system: '普通员工',
    status: '正常',
},{
    Numbering: 'a6ww6',
    name: '李芳芳',
    position: '产品经理',
    department: '信息管理部',
    local: '总部',
    system: '普通员工',
    status: '正常',
}]
