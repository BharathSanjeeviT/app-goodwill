export interface LogType {
  p_name: string;
  p_id: string;
  quant: string;
  receive_time: string;
  receiver: string;
  requested_time: string | null;
  sender_name: string;
  receiver_name: string;
  sender: string | null;
}

export interface PLogType {
  pname: string;
  logs: Array<{
    p_id: string;
    quant: string;
    receive_time: string;
    receiver: string | null;
    requested_time: string | null;
    sender_name: string;
    receiver_name: string;
    sender: string | null;
  }>;
}

export interface AttendanceRecord {
	check_in: string;
	check_out: string;
	s_name: string;
	s_id: string;
	day: string;
	total_days_present: string;
	total_hours_worked: string;
}

export interface Site {
	s_name: string;
	latitude: string;
	longitude: string;
	s_id: string;
	radius: number;
}

export interface Inventory {
	i_id: string;
	product: string;
	quantity: number;
	s_id: string;
	url: string;
}

export interface BroadcastsType {
	p_id: string;
	p_name: string;
	quant: string;
	receiver: string;
	receive_time: string | null;
	receiver_name: string;
	requested_time: string;
	sender_name: string | null;
	sender: string | null;
}

export interface NotificationType {
	nid: string;
	time: Date;
	uid: string;
	value: string;
	u_name: string;
}
