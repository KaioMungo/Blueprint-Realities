<<<<<<< HEAD
<<<<<<< HEAD
class ErrorPassword(Exception):
    def __init__(self, message):
        self.message = message

class EmptyStringError(Exception):
    def __init__(self, message):
        self.message = message

class AuthError(Exception):
    def __init__(self, message):
=======
class ErrorPassword(Exception):
    def __init__(self, message):
        self.message = message

class EmptyStringError(Exception):
    def __init__(self, message):
        self.message = message

class AuthError(Exception):
    def __init__(self, message):
>>>>>>> 5d04b3d (feat: addition new functionality prompt)
=======
class ErrorPassword(Exception):
    def __init__(self, message):
        self.message = message

class EmptyStringError(Exception):
    def __init__(self, message):
        self.message = message

class AuthError(Exception):
    def __init__(self, message):
>>>>>>> bcadf1ff3db2cf303eb4aeb051c23bd755ffb305
        self.message = message