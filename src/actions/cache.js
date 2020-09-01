import { setup } from "axios-cache-adapter";

function cacheTime() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        return { cache: 0, long_cache: 0, short_cache: 0 };
    } else {
        return { cache: 300000, long_cache: 900000, short_cache: 120000 };
    }
}

const cacheTimesVar = cacheTime();

export const cached_api = setup({
    cache: {
        // Invalidate only when a specific option is passed through config
        invalidate: async (config, request) => {
            if (request.clearCacheEntry === true) {
                await config.store.removeItem(config.uuid);
            }
        },
        maxAge: cacheTimesVar.cache,
    },
});

export const long_cached_api = setup({
    cache: {
        invalidate: async (config, request) => {
            if (request.clearCacheEntry) {
                await config.store.removeItem(config.uuid);
            }
        },
        maxAge: cacheTimesVar.long_cache,
    },
});

export const short_cached_api = setup({
    cache: {
        maxAge: cacheTimesVar.short_cache,
    },
});
