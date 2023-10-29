const AUTH_API_KEY = 'AIzaSyAajOB2yovVy6Gh_2OKju8kMEpfwCLL-5E';
let tokenTimer;

const authModule = {
    state() {
        return {
            userId: null,
            token: null        }
    },
    mutations: {
        setUser(state, payload) {
            state.userId = payload.userId;
            state.token = payload.token;
        }
    },
    actions: {
        async auth(context, payload) {
            const url = payload.action === 'login' ? 
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${AUTH_API_KEY}` :
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${AUTH_API_KEY}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                })
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.error.message.toLowerCase().split('_').join(' ');
                throw new Error(errorMessage || 'Failed to authenticate.');
            }

            const userData = {
                userId: data.localId,
                token: data.idToken
            };

            const tokenExpiresIn = Number(data.expiresIn) * 1000; // convert seconds to ms
            const tokenExpirationDate = new Date().getTime() + tokenExpiresIn; // expires time in future

            localStorage.setItem('token', userData.token);
            localStorage.setItem('userId', userData.userId);
            localStorage.setItem('tokenExpiration', tokenExpirationDate);

            tokenTimer = setTimeout(() => {
                context.dispatch('logout');
            }, tokenExpiresIn)

            context.commit('setUser', userData);
        },
        async login(context, payload) {
            return context.dispatch('auth', {...payload, action: 'login'});
        },
        async singup(context, payload) {
            return context.dispatch('auth', {...payload, action: 'singup'});
        },
        autoLogin(context) {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const tokenExpirationDate = localStorage.getItem('tokenExpiration');

            const tokenExpiresIn = Number(tokenExpirationDate) - new Date().getTime(); // token time expires left

            if (tokenExpiresIn < 0) {
                return;
            }

            tokenTimer = setTimeout(() => {
                context.dispatch('logout');
            }, tokenExpiresIn);

            if (token && userId) {
                context.commit('setUser', {
                    token,
                    userId
                });
            }
        },
        logout(context) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('tokenExpiration');

            clearTimeout(tokenTimer);

            context.commit('updateMovies', []);

            context.commit('setUser', {
                userId: null,
                token: null
            });
        }
    },
    getters: {
        userId(state) {
            return state.userId;
        },
        token(state) {
            return state.token;
        },
        isAuthenticated(state) {
            return !!state.token;
        }
    }
};

export default authModule;