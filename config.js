// Boilerplate code to be modified later with production db URL
exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://localhost/kontakt' :
                            'mongodb://localhost/kontakt-dev');
                            
exports.PORT = process.env.PORT || 8080;