import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:dio/dio.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Bin Tracker',
      theme: ThemeData(
        colorScheme:
            ColorScheme.fromSeed(seedColor: Color.fromARGB(255, 70, 119, 255)),
        useMaterial3: true,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
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

      final _data = {
        'email': _email,
        'username': _username,
        'password': _password,
      };

      dio
          .post('http://localhost:8000/auth/login', data: _data)
          .then((response) {
        print("Response: $response");
        if (response.statusCode == 200) {
          final response_data = jsonDecode(response.data);
          String token = response_data['token'];
          print("Token: $token");
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
            // Padding(
            //     padding: EdgeInsets.all(20.0),
            //     child: Image(image: AssetImage('./assets/logo.png'))),
            const Text(
              "Login",
              style: TextStyle(fontSize: 36, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 20),
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: TextFormField(
                keyboardType: TextInputType.emailAddress,
                decoration: InputDecoration(
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
                decoration: InputDecoration(
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
            ElevatedButton(onPressed: _login, child: Text("Login"))
          ],
        ),
      )),
    );
  }
}
