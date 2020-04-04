const env = 'production';
export default {
    api_url: (env == 'local')? 'http://127.0.0.1:8000' : 'https://raccmoon-craft.pl'
}
