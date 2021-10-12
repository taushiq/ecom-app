
const crypto = require('crypto');

var key = 'Zr4u7x!A%D*GA?D(Zr4u7x!A%D*GA?D(';
var iv = '5u8x/A%D*Gv9y$B&';

var decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv));

var encrypted = "jQ31/t+n65PUVGblGpTe6N/EC+MKCALu317xhTnmwH84LZQPJT6d9iVFSgEPWRvVFp7QpDAezJq+vY7v8QF0GpUh9Qt1ZgFlJ29EvJRtKlA="

decipher.setAutoPadding(false);
var decrypted = decipher.update(encrypted, 'base64');
decrypted += decipher.final();

console.log('decrypted :', decrypted);