export enum HeadersBody {
	json = 'application/json',
	form = 'multipart/form-data; boundary=<calculated when request is sent>',
	xForm = 'application/x-www-form-urlencoded',
	html = 'text/html',
}
