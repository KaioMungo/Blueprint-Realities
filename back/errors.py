class ErrorPassword(Exception):
    def __init__(self, message):
        self.message = message

class EmptyStringError(Exception):
    def __init__(self, message):
        self.message = message

class AuthError(Exception):
    def __init__(self, message):
        self.message = message