import { setup } from "axios-cache-adapter";

export const cached_api = setup({
    cache: {
        // Invalidate only when a specific option is passed through config
        invalidate: async (config, request) => {
            if (request.clearCacheEntry) {
                await config.store.removeItem(config.uuid);
            }
        },
        // milliseconds
        maxAge: 50000
    }
});

export const long_cached_api = setup({
    cache: {
        invalidate: async (config, request) => {
            if (request.clearCacheEntry) {
                await config.store.removeItem(config.uuid);
            }
        },
        // 5 min
        maxAge: 300000
    }
});

export const short_cached_api = setup({
    cache: {
        invalidate: async (config, request) => {
            if (request.clearCacheEntry) {
                await config.store.removeItem(config.uuid);
            }
        },
        // 15 seconds
        maxAge: 15000
    }
});
