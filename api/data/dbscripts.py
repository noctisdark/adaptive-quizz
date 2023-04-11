import sqlite3


conn = sqlite3.connect('./api/data/db.sqlite')
c = conn.cursor()

# Print table names
# c.execute("SELECT name FROM sqlite_master WHERE type='table'")
# tables = c.fetchall()
# for table in tables:
#     print(table[0])


# Drop a table
# c.execute('DROP TABLE quizzes')
# conn.commit()


# print rows of a table
c.execute("SELECT * FROM user_quizz")
questions = c.fetchall()
for question in questions:
    print(question)




c.close()
conn.close()

