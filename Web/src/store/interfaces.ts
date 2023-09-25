interface User {
	_id: string;
	first_name: string;
	last_name: string;
	username: string;
	email?: string;
	user_type: string;
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
	device_id?: string;
	group_id?:Group;
}

interface User2 {
	_id: string;
	first_name: string;
	last_name: string;
	username: string;
	email?: string;
	user_type: string;
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
	device_id?: string;
	group_id?:string;
}



interface Token {
	token: string | null;
}

interface BinRecord{
    _id: string;
    record: string;
    createdAt: string;
    updatedAt: string;
}

interface Bin {
	_id: string;
	custom_id: string;
	longitude: string;
	latitude: string;
	group_id: string;
	last_pickup_time: string | undefined;
	waste_type: string | undefined;
	data: Array<BinRecord>;
}

interface Truck {
	_id: string;
	plate_number: string;
	group_id: string;
	driver_id: any;
	last_oil_change?: string | undefined;
	last_wash?: string | undefined;
}

interface Group {
	_id: string;
	name: string;
	admins: Array<string>;
	members: Array<string>;
}

interface Generic {
	_id: string
}

export { User, User2, Token, Bin, BinRecord, Group, Truck, Generic };
