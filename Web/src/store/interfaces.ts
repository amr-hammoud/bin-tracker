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
}

interface Token {
	token: string | null;
}

interface BinRecord{
    timestamp: string;
    record: string;
}

interface Bin {
	custom_id: string;
	longitude: string | null;
	latitude: string | null;
	group_id: string;
	last_pickup_time: string | undefined;
	waste_type: string | undefined;
	data: Array<BinRecord>;
}

interface Truck {
	_id: string;
	custom_id: string;
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

export { User, Token, Bin, BinRecord, Group, Truck };
