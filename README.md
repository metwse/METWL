# METWL
A dependency-free binary-based lightweight and minimal data serialization library.


Byte structure:
| byte > | 00 | 01 | 02 | 03 | 04 | 05 | 06 | 07 |
| --: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| **1** |  | ... |  |  | 0 | 0 | 0 | ... |
| **2** |  | ... |  |  | 0 | 0 | 0 | ... |
| **3** |  | ... |  |  | 0 | 0 | 0 | ... |
| **4** |  | ... |  |  | 0 | 0 | 0 | ... |
| **5** |  | ... |  |  | 0 | 0 | 0 | ... |
| **6** |  | ... |  |  | 0 | 0 | 0 | ... |
| **7** |  | ... |  |  | 0 | 0 | 0 | ... |
| **8** | 0 | 0 | 0 | 1 | 0 | 0 | 0 | ... |
| bit ^ | length | length | length | type | data | data | data | data |
 
