## Horns and Moos

This is a Bulls and Cows game under a different name.

### RULES
### Numerical Version
- The player should try to guess the 4 digit number.
- The player will know how close his guess is from these clues:
  - Bulls: Digits are present and in the right position.
  - Cows: Digits are present but in the wrong position.
- If either number has repeated digits the rule is that each digit can only count towards the score once, and Bulls are counted before Cows.

#### Example
Number: ***5 4 9 2***
| Guess | Result |
|-------|--------|
| 1 *2* 3 *4* | 0 Bulls, 2 *Cows* |
| **5** 6 7 8 | 1 **Bull**, 0 Cows |
| **5** *2* 3 *4* | 1 **Bull**, 2 *Cows* |
| **5** *9* *4* **2** | 2 **Bulls**, 2 *Cows* |
| **5** **4** **9** **2** | 4 **Bulls**, 0 Cows |

### Word Version
- Similar to the [Numerical Version](#numerical-version) but instead of numbers, words are used.
