METWL = {
    u: {
        te: new TextEncoder(), td: new TextDecoder(),
        ua(n) /* uint to uint8array */ {
            if (!n) [0]; var a = []; if (typeof n == 'number' && n < 4294967296) for (let i = 0; i <= Math.floor(Math.log2(n) / 8); i++) a.unshift((n >> (i * 8)) & 255)
            else for (let i = 0n; i <= Math.floor(Math.log2(Number(n)) / 8); i++) a.unshift(Number(BigInt(n) >> (i * 8n) & 255n)); return a
        },
        au(a) /* uint8array to uint */ {
            if (!a.length) return 0
            var n = a.reduceRight(a.length > 3 ? ((p, c, i) => BigInt(p) | (BigInt(c) << BigInt((a.length - i - 1) * 8))) : ((p, c, i, a) => p | (c << ((a.length - i - 1) * 8))))
            return n < Number.MAX_SAFE_INTEGER ? Number(n) : n
        },
        au7(a) /* uint7array to uint */ {
            if (!a.length) return 0
            var n = a.reduceRight(a.length > 3 ? ((p, c, i) => BigInt(p) | (BigInt(c) << BigInt((a.length - i - 1) * 7))) : ((p, c, i, a) => p | (c << ((a.length - i - 1) * 7))))
            return n < Number.MAX_SAFE_INTEGER ? Number(n) : n
        },

        m /* mapped types */: { '6': true, '7': false, '8': null, '12': [], '13': {}, '14': Infinity, '15': -Infinity },
        l(l) /* length-type uint8array */ { var a = []; for (let i = 0; i < Math.floor(Math.log2(l) / 7) + 1; i++) a.unshift(((l >> (7 * i)) & 127) << 1); return a },

        t(data) /* typecode of object */ {
            if (data === undefined) return 8
            if (typeof data == 'number' && data % 1 != 0) return 3
            if (['number', 'bigint'].includes(typeof data)) return +(Math.sign(Number(data)) < 0)
            if ([Uint8Array.prototype, ArrayBuffer.prototype].includes(Object.getPrototypeOf(data))) return 4
            if (typeof data == 'string') return 5
            if (Object.getPrototypeOf(data) == Array.prototype) return data.length ? 9 : 12
            if (Object.getPrototypeOf(data) == Date.prototype) return 11
            if (typeof data == 'object') return Object.keys(data).length ? 10 : 13
            return 8
        },

        D(o, M) /* dumper */ {
            var m = Object.keys(this.m).find((k, _, m) => this.m[k] === o)
            if (m) return [(m << 1) | 1]
            var d, t = this.t(o)
            switch (t) {
                case 0: d = this.ua(o); break
                case 1: d = this.ua(typeof o == 'number' ? o * -1 : o * -1n); break
                case 2: var arr = new Float32Array(1); arr[0] = o, d = Array.from(new Uint8Array(arr.buffer)); break
                case 3: var arr = new Float64Array(1); arr[0] = o, d = Array.from(new Uint8Array(arr.buffer)); break
                case 4: d = Object.getPrototypeOf(o) == ArrayBuffer.prototype ? Array.from(new Uint8Array(o)) : Array.from(o); break
                case 5: d = Array.from(this.te.encode(o)); break
                case 8: return [17]
                case 9: d = o.map(v => this.D(v)).flat(); break
                case 10:
                    d = [];
                    for (let entry of Object.entries(o)) d = d.concat(this.D(entry[0]), this.D(entry[1]))
                    break
                case 11: d = this.ua(o.getTime()); break
            }
            return (!M && [0, 1, 4, 5, 9, 10, 11].includes(t) ? this.l(d.length) : []).concat([(t << 1) | 1], d ? d : [])
        },

        P(d, M) /* paraser */ {
            var l = [], t = 0
            for (let i = 0; i < d.length; i++) {
                if ((d[0] | 1) == d[0]) { t = d.shift() >> 1; break }
                else l.push(d.shift() >> 1)
            }
            if (this.m[t] !== undefined) return this.m[t]
            else {
                if (!M) {
                    if (t == 2) l = 4; else if (t == 3) l = 8
                    else l = l.length ? this.au7(l) : 0
                    d = d.splice(0, Number(l))
                }
                switch (t) {
                    case 0: return this.au(d)
                    case 1: var num = this.au(d); return num * (typeof num == 'number' ? -1 : -1n)
                    case 2: return new Float32Array(new Uint8Array(d).buffer)[0]
                    case 3: return new Float64Array(new Uint8Array(d).buffer)[0]
                    case 4: return new Uint8Array(d)
                    case 5: return this.td.decode(new Uint8Array(d))
                    case 9: var a = []; while (d.length) a.push(this.P(d)); return a
                    case 10: var a = {}; while (d.length) a[this.P(d)] = this.P(d); return a
                    case 11: if (!d.length) return new Date(0); var D = new Date(); D.setTime(Number(this.au(d))); return D
                }
            }
        }
    },
    dump(o) { return new Uint8Array(this.u.D(o, true)) },
    parse(d) { return this.u.P(Array.from(Object.getPrototypeOf(d) == ArrayBuffer.prototype ? new Uint8Array(d) : d), true) }
}
