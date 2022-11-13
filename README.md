# METWL
A dependency-free binary-based lightweight and minimal data serialization library.

## Usage
```js
METWL.dump(Any-Object)
METWL.parse(METWL-data (Array, ArrayBuffer, Uint8Array))
```


## METWL Standart Structure 

### Byte structure:
| byte> | 00 | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 09 | 10 | 11 | 12 | 13 | 14 | 15 | ...
| --: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| **1** |  | ... |  |  | 0 | 0 | 0 | ... |  | ... |  |  | 0 | 0 | 0 | ... |
| **2** |  | ... |  |  | 0 | 0 | 0 | ... |  | ... |  |  | 0 | 0 | 0 | ... |
| **3** |  | ... |  |  | 0 | 0 | 0 | ... |  | ... |  |  | 0 | 0 | 0 | ... |
| **4** |  | ... |  |  | 0 | 0 | 0 | ... |  | ... |  |  | 0 | 0 | 0 | ... |
| **5** |  | ... |  |  | 0 | 0 | 0 | ... |  | ... |  |  | 0 | 0 | 0 | ... |
| **6** |  | ... |  |  | 0 | 0 | 0 | ... |  | ... |  |  | 0 | 0 | 0 | ... |
| **7** |  | ... |  |  | 0 | 0 | 0 | ... |  | ... |  |  | 0 | 0 | 0 | ... |
| **8** | 0 | 0 | 0 | 1 | 0 | 0 | 0 | ... | 0 | 0 | 0 | 1 | 0 | 0 | 0 | ... |
| bit^ | `length` | `length` | `length` | &nbsp;`type`&nbsp; | &nbsp;`data`&nbsp; | &nbsp;`data`&nbsp; | &nbsp;`data`&nbsp; | &nbsp;`data`&nbsp; | `length` | `length` | `length` | &nbsp;`type`&nbsp; | &nbsp;`data`&nbsp; | &nbsp;`data`&nbsp; | &nbsp;`data`&nbsp; |  
 
### Types
 |type|    name    |length required|
|:--:|:----------:|:-------------:|
| 0  |    int     |        ✓       |
| 1  |negative int|        ✓       |
| 2  |  float32   |               |
| 3  |  float64   |               |
| 4  |array buffer|       ✓        |
| 5  |   string   |       ✓        |
| 6  |    true    |               |
| 7  |   false    |               |
| 8  |    null    |               |
| 9  |    list    |       ✓        |
| 10 |   object   |       ✓        |
| 11 |    date    |       ✓        |
| 12 |     [ ]     |               |
| 13 |     { }     |               |
| 14 |  Infinity  |               |
| 15 | -Infinity  |               |
