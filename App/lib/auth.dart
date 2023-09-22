import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';

class AuthPage extends StatefulWidget {
  const AuthPage({super.key});

  @override
  State<AuthPage> createState() => _AuthPageState();
}

class _AuthPageState extends State<AuthPage> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  String _emailOrUsername = "";
  String _email = "";
  String _username = "";
  String _password = "";

  void _login() {
    final form = _formKey.currentState;
    print("Hello");
    if (form != null && form.validate()) {
      form.save();

      if (_emailOrUsername.contains("@")) {
        _email = _emailOrUsername;
        _username = "";
      } else {
        _username = _emailOrUsername;
        String email = "";
      }

      final dio = Dio();

      final data = {
        'email': _email,
        'username': _username,
        'password': _password,
      };

      dio
          .post('http://192.168.48.64:8000/auth/login', data: data)
          .then((response) {
        print("Data: $data");
        print("Response: $response");
        if (response.statusCode == 200) {
          final responseData = jsonEncode(response.data);
          // String token = responseData['token'];
          // print("Token: $token");
          print(responseData);
        } else {
          print("Login Failed");
        }
      }).catchError((err) {
        print("Error: $err");
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
          child: Form(
        key: _formKey,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Image.asset('assets/logo.png'),
            const Text(
              "Login",
              style: TextStyle(fontSize: 36, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: TextFormField(
                keyboardType: TextInputType.emailAddress,
                decoration: const InputDecoration(
                  labelText: "Email/Username",
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your email/username';
                  }
                  return null;
                },
                onSaved: (newValue) {
                  _emailOrUsername = newValue ?? "";
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: TextFormField(
                obscureText: true,
                decoration: const InputDecoration(
                  labelText: "Password",
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your password';
                  }
                  return null;
                },
                onSaved: (newValue) {
                  _password = newValue ?? "";
                },
              ),
            ),
            ElevatedButton(onPressed: _login, child: const Text("Login"))
          ],
        ),
      )),
    );
  }
}
